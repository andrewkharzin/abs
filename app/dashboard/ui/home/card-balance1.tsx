"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);
  const [cnyRate, setCnyRate] = useState(null);
  const [usdPrevious, setUsdPrevious] = useState(null);
  const [eurPrevious, setEurPrevious] = useState(null);
  const [cnyPrevious, setCnyPrevious] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");
        const usdRate = response.data.Valute.USD.Value;
        const eurRate = response.data.Valute.EUR.Value;
        const cnyRate = response.data.Valute.CNY.Value;
        const usdPrevious = response.data.Valute.USD.Previous;
        const eurPrevious = response.data.Valute.EUR.Previous;
        const cnyPrevious = response.data.Valute.CNY.Previous;

        setUsdRate(usdRate);
        setEurRate(eurRate);
        setCnyRate(cnyRate);
        setUsdPrevious(usdPrevious);
        setEurPrevious(eurPrevious);
        setCnyPrevious(cnyPrevious);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Еxchange rates</span>

          </div>
        </div>
        <div className="flex flex-col no-wrap">
          <div className="flex gap-2.5 py-2 items-center">
            <span className="text-default-900 text-xl font-semibold">
              {`$${usdRate}`}
            </span>
            <span className={`text-xs, ${usdRate > usdPrevious ? "text-success" : "text-danger"}`}>
             {usdRate > usdPrevious ? `↑${usdPrevious}` : `↓${usdPrevious}`}
            </span>
          </div>

          <div className="flex gap-2.5 py-2 items-center">
            <span className="text-default-900 text-xl font-semibold">
              {`€${eurRate}`}
            </span>
            <span className={`text-xs ${eurRate > eurPrevious ? "text-success" : "text-danger"}`}>
              {eurRate > eurPrevious ? `↑${eurPrevious}` : `↓${eurPrevious}`}
            </span>
          </div>
          <div className="flex gap-2.5 py-2 items-center">
            {/* <span className="text-white text-lg font-semibold">CNY:</span> */}
            <span className="text-white text-lg font-semibold">{`¥${cnyRate}`}</span>
            <span className={`text-xs ${cnyRate > cnyPrevious ? "text-success" : "text-danger"}`}>
              {cnyRate > cnyPrevious ? `↑${cnyPrevious}` : `↓${cnyPrevious}`}
            </span>
          </div>
        </div>
        {/* Добавьте здесь изменение в процентах */}
      </CardBody>
    </Card>
  );
};
