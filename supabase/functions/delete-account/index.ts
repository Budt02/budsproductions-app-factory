import { withSupabase } from "npm:@supabase/server@^1";

export default {
  fetch: withSupabase({ auth: "user" }, async (_req, ctx) => {
    const userId = ctx.userClaims?.sub;

    if (!userId) {
      return Response.json({ error: "Authenticated user required." }, { status: 401 });
    }

    try {
      const { error: dataError } = await ctx.supabaseAdmin
        .from("app_data")
        .delete()
        .eq("user_id", userId);

      if (dataError) {
        console.error("app_data deletion failed:", dataError);
        return Response.json(
          { error: "Could not delete account data." },
          { status: 500 }
        );
      }

      const { error: authError } =
        await ctx.supabaseAdmin.auth.admin.deleteUser(userId);

      if (authError) {
        console.error("Auth user deletion failed:", authError);
        return Response.json(
          { error: "Could not complete account deletion." },
          { status: 500 }
        );
      }

      return Response.json({ ok: true });
    } catch (error) {
      console.error("Account deletion exception:", error);
      return Response.json(
        { error: "Account deletion failed." },
        { status: 500 }
      );
    }
  }),
};
