"use client";
import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      yourName: name,
      yourEmail: email,
      yourSubject: subject,
      yourMessage: message,
    };

    try {
      const response = await fetch(
        "https://localhost/portfolio_wp/wp-json/contact-form-7/v1/contact-forms/6f618d6/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Formulier succesvol verzonden");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        console.error(
          "Er was een fout bij het verzenden van het formulier:",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Er was een fout bij het verzenden van het formulier:",
        error
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[300px] relative left-[20px] top-[-150px] lg:top-[-370px] lg:w-[350px] bg-white rounded-[35px] shadow-2xl text-black p-8"
    >
      <h1 className="text-center font-bold text-3xl mb-8">Kom in contact</h1>

      <div className="flex flex-col items-center gap-8">
        <input
          type="text"
          placeholder="Volledige naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b-2 w-full lg:w-[250px] p-1 outline-none focus:border-b-4 focus:border-[#6375ed] transition ease-in-out duration-500"
        />
        <input
          type="email"
          placeholder="Email-adres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 w-full lg:w-[250px] p-1 outline-none focus:border-b-4 focus:border-[#6375ed] transition ease-in-out duration-500"
        />
        <input
          type="text"
          placeholder="Onderwerp"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-b-2 w-full lg:w-[250px] p-1 outline-none focus:border-b-4 focus:border-[#6375ed] transition ease-in-out duration-500"
        />
        <textarea
          rows={4}
          placeholder="Bericht"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 w-full lg:w-[250px] p-1 outline-none focus:border-b-4 focus:border-[#6375ed] transition ease-in-out duration-500"
        />
        <button className="border-2 border-black rounded-full p-2 w-full lg:w-[200px] font-bold hover:bg-[#6375ed] hover:border-none hover:text-white transition ease-in-out duration-500">
          Verstuur
        </button>
      </div>
    </form>
  );
}
