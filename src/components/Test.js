import React, { useEffect, useState } from "react";

const Test = () => {
  const [test, setTest] = useState("");

  useEffect(() => {
    setTest("zzzz");
    console.log(test);
  });

  return (
    <div>
      <div>hel</div>
    </div>
  );
};

export default Test;
