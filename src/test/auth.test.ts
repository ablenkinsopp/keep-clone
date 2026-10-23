import { describe, it, expect, beforeEach } from "vitest";
import { supabase } from "../supabase";

describe("Auth Flow", () => {
    let testEmail = `test-${Date.now()}@example.com`;
    let testPassword = "password123";
    let testUsername = `user-${Date.now()}@example.com`;

    beforeEach(async () => {
        // Clean up any leftover test users if needed
    });

    it("creates a profile row when user signs up", async () => {
        const { data: authData, error: authError } = await supabase.auth.signUp(
            {
                email: testEmail,
                password: testPassword,
                options: { data: { username: testUsername } },
            },
        );

        expect(authError).toBeNull();
        expect(authData.user).toBeDefined();

        // Check profiles table
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user!.id)
            .single();

        expect(profileError).toBeNull();
        expect(profile).toBeDefined();
        expect(profile.username).toBe(testUsername);
    });

    // it("blocks cross-user reads via RLS", async () => {
    //     const emailA = `userA-${Date.now()}@example.com`;
    //     const emailB = `userB-${Date.now()}@example.com`;
    //     const password = "pass123";

    //     await supabase.auth.signUp({ email: emailA, password });
    //     await supabase.auth.signUp({ email: emailB, password });

    //     await supabase.auth.signInWithPassword({ email: emailA, password });

    //     const { data: noteA } = await supabase
    //         .from("notes")
    //         .insert([{ title: "Secret", body: "Shhh" }])
    //         .select()
    //         .single();

    //     await supabase.auth.signInWithPassword({ email: emailB, password });

    //     const { data: notesB } = await supabase
    //         .from("notes")
    //         .select("*")
    //         .eq("id", noteA!.id);

    //     expect(notesB).toEqual([]);
    // });
});
