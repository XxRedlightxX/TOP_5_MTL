import { AuthApi } from "Playwright/api/AuthApi";
import { UserApi } from "Playwright/api/UserApi";
import { User } from "Playwright/models/User";
import { test, expect } from '@playwright/test';

export const convertString = (pArg : number) => {return pArg.toString()}
