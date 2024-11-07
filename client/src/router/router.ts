import { FC } from "react";

import Auth from "../components/Auth/AuthForm";
import Score from "../components/Score/Score";
import TypingSection from "../components/TypingSection/TypingSection";
import Main from "../pages/Main";


interface Route {
  path: string;
  component: FC;
}

export const publicRoutes: Route[] = [
  { path: "/auth", component: Auth },
  { path: "/main", component: Main },
  { path: "/lesson", component: TypingSection },
  { path: "/lesson/score", component: Score }
]

export const privateRoutes: Route[] = [
  { path: "/main", component: Main },
]