import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface backendInterface {
    deleteSubmission(id: bigint): Promise<void>;
    getAllSubmissions(): Promise<Array<Submission>>;
    submitBooking(name: string, email: string, phone: string, organization: string, eventType: string, message: string): Promise<bigint>;
}
