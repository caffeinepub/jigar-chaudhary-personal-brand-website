import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    organization : Text;
    eventType : Text;
    message : Text;
    timestamp : Int;
  };

  type Registration = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    collegeProfession : Text;
    timestamp : Int;
  };

  type UserProfile = {
    name : Text;
    // Extra metadata if necessary
  };

  let submissions = Map.empty<Nat, Submission>();
  let registrations = Map.empty<Nat, Registration>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextId = 0;

  public shared ({ caller }) func submitBooking(
    name : Text,
    email : Text,
    phone : Text,
    organization : Text,
    eventType : Text,
    message : Text,
  ) : async Nat {
    // Any authenticated user (including guests visiting the site) can submit a booking request
    let submission : Submission = {
      id = nextId;
      name;
      email;
      phone;
      organization;
      eventType;
      message;
      timestamp = Time.now();
    };
    submissions.add(nextId, submission);
    nextId += 1;
    submission.id;
  };

  public query ({ caller }) func getAllBookings() : async [Submission] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    submissions.values().toArray();
  };

  public query ({ caller }) func getBooking(id : Nat) : async ?Submission {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    submissions.get(id);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profile");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitRegistration(
    name : Text,
    email : Text,
    phone : Text,
    collegeProfession : Text,
  ) : async Nat {
    // Any visitor (including guests) can register for a session
    let registration : Registration = {
      id = nextId;
      name;
      email;
      phone;
      collegeProfession;
      timestamp = Time.now();
    };
    registrations.add(nextId, registration);
    nextId += 1;
    registration.id;
  };

  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all registrations");
    };
    registrations.values().toArray();
  };

  public query ({ caller }) func getRegistration(id : Nat) : async ?Registration {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view registrations");
    };
    registrations.get(id);
  };

  public shared ({ caller }) func deleteBooking(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete bookings");
    };
    if (not submissions.containsKey(id)) {
      Runtime.trap("Booking not found");
    };
    submissions.remove(id);
  };

  public shared ({ caller }) func deleteRegistration(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete registrations");
    };
    if (not registrations.containsKey(id)) {
      Runtime.trap("Registration not found");
    };
    registrations.remove(id);
  };

  public query ({ caller }) func getBookingImage(_bookingId : Nat) : async ?Storage.ExternalBlob {
    null;
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
