"use client";

import { useState } from "react";
import RateplanSlider from "./RateplanSlider";

type Props = {
  rateplans: Rateplan[];
};

export default function RateplanSection({ rateplans }: Props) {
  const [voiceIndex, setVoiceIndex] = useState(1);
  const [dataIndex, setDataIndex] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  const voiceData = getValuesForRateplan("voice", rateplans);
  const dataData = getValuesForRateplan("data", rateplans);
  const speedData = getValuesForRateplan("speed", rateplans);

  const selectedRateplan = rateplans.find(
    rateplan =>
      rateplan.voice === voiceData.at(voiceIndex) &&
      rateplan.data === dataData.at(dataIndex) &&
      rateplan.speed === speedData.at(speedIndex),
  );

  return (
    <section>
      <div className="flex w-full max-w-[320px] flex-col items-center gap-2">
        <RateplanSlider
          value={voiceIndex}
          calculatedValue={voiceData.at(voiceIndex)}
          length={voiceData.length - 1}
          unit="voice"
          handleChange={handleRateplanChange}
        >
          Minuty + SMS
        </RateplanSlider>
        <RateplanSlider
          value={dataIndex}
          calculatedValue={dataData.at(dataIndex)}
          length={dataData.length - 1}
          unit="data"
          handleChange={handleRateplanChange}
        >
          Data
        </RateplanSlider>
        <RateplanSlider
          value={speedIndex}
          calculatedValue={speedData.at(speedIndex)}
          length={speedData.length - 1}
          unit="speed"
          handleChange={handleRateplanChange}
          isDisabled={dataIndex === 0}
        >
          Rychlost
        </RateplanSlider>
      </div>
      {selectedRateplan && (
        <div className="flex flex-col">
          <pre>{JSON.stringify(selectedRateplan, null, 2)}</pre>
        </div>
      )}
    </section>
  );

  function handleRateplanChange(newValue: number, unit: "data" | "speed" | "voice") {
    if (unit === "voice") {
      if (newValue === 0 && dataIndex === 0) {
        return;
      }
      setVoiceIndex(newValue);
    }

    if (unit === "data") {
      if (newValue === 0 && voiceIndex === 0) {
        return;
      }
      setDataIndex(newValue);
    }

    if (unit === "speed") {
      setSpeedIndex(newValue);
    }
  }

  function getValuesForRateplan(key: "speed" | "voice" | "data", rateplans: Rateplan[]) {
    const rateplansValues = getRateplanValues(key, rateplans) as number[];
    return sortRateplanValues(rateplansValues);
  }

  function sortRateplanValues(rateplanValues: number[]) {
    const sorted = rateplanValues.sort((a, b) => a - b);
    if (!sorted.includes(-1)) {
      return sorted;
    }

    sorted.shift();
    sorted.push(-1);
    return sorted;
  }

  function getRateplanValues(key: keyof Rateplan, rateplans: Rateplan[]) {
    return getUniqueValues<Rateplan>(key, rateplans);
  }

  function getUniqueValues<T extends {}>(key: keyof T, objects: T[]) {
    return Array.from(new Set(objects.map(item => item[key])));
  }
}
