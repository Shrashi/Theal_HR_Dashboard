import { cookies } from "next/headers";


export default function getCookies(){
    const token : any = cookies().get("token");
    return token?.value;
}