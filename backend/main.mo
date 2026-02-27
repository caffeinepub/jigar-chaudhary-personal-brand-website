import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";

actor {
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

  let submissions = Map.empty<Nat, Submission>();
  var nextId = 0;

  public shared ({ caller }) func submitBooking(name : Text, email : Text, phone : Text, organization : Text, eventType : Text, message : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let submission : Submission = {
      id;
      name;
      email;
      phone;
      organization;
      eventType;
      message;
      timestamp = Time.now();
    };

    submissions.add(id, submission);
    id;
  };

  public shared ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray();
  };

  public shared ({ caller }) func deleteSubmission(id : Nat) : async () {
    if (submissions.containsKey(id)) {
      submissions.remove(id);
    } else {
      Runtime.trap("Submission not found");
    };
  };

  system func preupgrade() {
    let nonEmptyEntries = submissions.filter(
      func(_id, submission) {
        not (submission.name.isEmpty() and submission.email.isEmpty());
      }
    );
    submissions.clear();
    for ((id, submission) in nonEmptyEntries.entries()) {
      submissions.add(id, submission);
    };
  };

  system func postupgrade() {
    if (submissions.isEmpty()) {
      let initialSubmission : Submission = {
        id = 0;
        name = "";
        email = "";
        phone = "";
        organization = "";
        eventType = "";
        message = "";
        timestamp = 0;
      };
      submissions.add(0, initialSubmission);
      nextId := 1;
    };
  };
};
