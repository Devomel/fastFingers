import { FC } from "react";

import Auth from "../components/Auth/AuthForm";
import TypingSection from "../components/TypingSection/TypingSection";
import GamePage from "../pages/GamePage";
import Main from "../pages/Main";


interface Route {
   path: string;
   component: FC;
}

export const publicRoutes: Route[] = [
   { path: "/auth", component: Auth },
   { path: "/main", component: Main },
   { path: "/lesson", component: TypingSection },
   { path: "/playing", component: GamePage }
]

export const privateRoutes: Route[] = [
   { path: "/main", component: Main },
   { path: "/lesson", component: TypingSection },
   { path: "/playing", component: GamePage },
   { path: "/main", component: Main },
]