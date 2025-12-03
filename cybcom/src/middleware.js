import { NextResponse } from "next/server";
import { refresh, validate } from "./service/authService";

export async function middleware(request) {
  const acessTtoken = request.cookies.get("acessToken")?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!acessTtoken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const res = await validate(acessTtoken)

  const next = NextResponse.next()
  if(!res){
    let acess;
    try{
      acess= await refresh(refreshToken)

    } catch {
      next.cookies.delete('accessToken')
      next.cookies.delete('refreshToken')
      return NextResponse.redirect(new URL("/login", request.url));
    }

    next.cookies.set('accessToken', acess)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/admin", "/feed", "/newpost", "/post", "/profile", "/notification"],
};
