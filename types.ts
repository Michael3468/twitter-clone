import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";

export interface ITrendingResults {
  heading: string;
  description: string;
  img: string;
  tags: string[];
}

export interface IFollowResults {
  userImg: string;
  username: string;
  tag: string;
}

export interface IProviders {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
