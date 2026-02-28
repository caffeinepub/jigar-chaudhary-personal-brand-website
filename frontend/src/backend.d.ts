import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Registration {
    id: bigint;
    collegeProfession: string;
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface Submission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    organization: string;
    phone: string;
    eventType: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBooking(id: bigint): Promise<void>;
    deleteRegistration(id: bigint): Promise<void>;
    getAllBookings(): Promise<Array<Submission>>;
    getAllRegistrations(): Promise<Array<Registration>>;
    getBooking(id: bigint): Promise<Submission | null>;
    getBookingImage(_bookingId: bigint): Promise<ExternalBlob | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRegistration(id: bigint): Promise<Registration | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(name: string, email: string, phone: string, organization: string, eventType: string, message: string): Promise<bigint>;
    submitRegistration(name: string, email: string, phone: string, collegeProfession: string): Promise<bigint>;
}
