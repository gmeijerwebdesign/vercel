"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const homeState = {
    title: "Jouw Online Presentatie, Perfect Ontworpen",
    slug: "Een Website die Met Jou Mee Groeit",
    one: "Snel, Mobielvriendelijk & Creatief Ontworpen",
    two: "Logo, Huisstijl & Front-end Design: Van Idee tot Implementatie",
    three: "React Ontwikkeling met WordPress CMS",
  };
  const dienstenState = {
    title: "Onze diensten",
    slug: "Samen bouwen aan jouw digitale toekomst",
    one: "Snelle, mobielvriendelijke websites, geoptimaliseerd voor conversie",
    two: "Creatief design voor logo's, huisstijlen en gebruiksvriendelijke interfaces",
    three:
      "Maatwerk ontwikkeling in WordPress of op volledig aangepaste platforms",
  };
  const [text, setText] = useState(homeState);

  useEffect(() => {
    if (pathname === "/diensten") {
      setText(dienstenState);
    } else {
      setText(homeState);
    }
  }, [pathname]);

  const scrollToCases = (e) => {
    e.preventDefault();
    const casesSection = document.getElementById("cases-section");
    if (casesSection) {
      casesSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full header flex justify-center text-white">
      <div className="flex w-[100vw] lg:w-[80vw] justify-center lg:justify-between items-center h-[100px]">
        <div className="flex flex-col lg:p-0 p-3">
          <p className="lg:text-left text-center relative top-[95px] lg:top-[100px] text-3xl lg:text-4xl font-bold">
            <Link href="/home">
              LEMARO<span className="text-[#ff376d] pl-2">.</span>
            </Link>
          </p>
          <div className="relative top-[120px] lg:top-[170px]">
            <h2 className="text-1xl lg:text-2xl max-w-[350px] font-semibold">
              {text.title}
            </h2>
            <p className="text-sm font-light italic pt-1">{text.slug}</p>

            <div className="text-sm relative top-[30px] flex flex-col gap-4">
              <div className="flex items-center gap-4 ">
                <p className="text-green-400 ">✔</p>
                <p>{text.one}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-green-400 ">✔</p>
                <p>{text.two}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-green-400 ">✔</p>
                <p>{text.three}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex gap-11 text-1xl items-center">
          <p>
            <Link href="/diensten" scroll={true}>
              Diensten
            </Link>
          </p>
          <p>
            <Link href="/" onClick={scrollToCases}>
              Cases
            </Link>
          </p>
          <p>
            <Link href="/" onClick={scrollToAbout}>
              Over
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
