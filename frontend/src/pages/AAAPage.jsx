import { createUser } from "../services/userService";

import React, { useEffect, useState } from "react";

function AAAPage() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const userData = {
      username: "vinhchi123",
      password: "12345678910",
      firstName: "chi",
      lastName: "vinh",
      email: "levinhchi123@gmail.com",
      address: "123 Lincon",
      phone: "0333475252",
      // gender: 1,
      dob: "1990-02-01",
    };

    const createUserAsync = async () => {
      const res = await createUser(userData);
      console.log(res);
      if (res.success) {
        setResult(res);
      } else {
        console.log("ZZZz");
        setResult(res);
      }
    };

    createUserAsync();
  }, []);

  return (
    <>
      <h1>Test Page</h1>
      <h1>{result.code}</h1>
    </>
  );
}

export default AAAPage;
