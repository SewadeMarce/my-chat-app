import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
export default [
    index("pages/home.tsx"),

     layout("layout/auth.tsx", [
         route("login", "pages/login.tsx"),
         route("signup", "pages/signUp.tsx"),
     ]),
    // route("/chat-app", "layout/chat.tsx", [
    //     index("pages/chat.tsx"),
    //     route(":_id", "pages/_id.tsx")
    // ]),


] satisfies RouteConfig;
