import { useState } from "react";
import "./RailFenceCipher.css";

const RailFenceCipher = () => {
  const [text, setText] = useState("");
  const [depth, setDepth] = useState(2);
  const [result, setResult] = useState("");

  const encodeRailFence = (str, numRails) => {
    if (numRails < 2) return str;

    let rails = Array.from({ length: numRails }, () => []);
    let row = 0, down = false;

    for (let char of str.replace(/\s/g, "")) { 
      rails[row].push(char);
      if (row === 0 || row === numRails - 1) down = !down;
      row += down ? 1 : -1;
    }

    return rails.flat().join("");
  };

  const decodeRailFence = (str, numRails) => {
    if (numRails < 2) return str;

    let pattern = new Array(str.length);
    let row = 0, down = false;

    for (let i = 0; i < str.length; i++) {
        pattern[i] = row;
        if (row === 0 || row === numRails - 1) down = !down;
        row += down ? 1 : -1;
    }

    let rails = Array.from({ length: numRails }, () => []);
    let index = 0;

    for (let r = 0; r < numRails; r++) {
        for (let i = 0; i < str.length; i++) {
            if (pattern[i] === r) {
                rails[r].push(str[index++]);
            }
        }
    }

    let decoded = "";
    let railPointers = new Array(numRails).fill(0);

    for (let i = 0; i < str.length; i++) {
        let r = pattern[i];
        decoded += rails[r][railPointers[r]++];
    }

    return decoded;
  };

  return (
    <div className="container">
      <h2>Rail Fence Cipher</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Depth"
        value={depth}
        min={2}
        onChange={(e) => setDepth(Math.max(2, Number(e.target.value)))}
      />
      <div className="button-group">
        <button onClick={() => setResult(encodeRailFence(text, depth))}>Encode</button>
        <button onClick={() => setResult(decodeRailFence(text, depth))}>Decode</button>
      </div>

      <div className="result-box">Result: {result}</div>
    </div>
  );
};

export default RailFenceCipher;
