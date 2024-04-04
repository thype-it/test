import React from "react";
import HeadingMotion from "../../shared/HeadingMotion";
import Section from "../../shared/Section";
import Container from "../../shared/Container";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./Carousel";

type Props = {};

export default function CustomerPlanSection({}: Props) {
  return (
    <Section>
      <Container>
        <HeadingMotion level={5}>
          Alebo pozri, čo <br />
          sme ti vybrali
        </HeadingMotion>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Box></Box>
            </CarouselItem>
            <CarouselItem>
              <Box></Box>
            </CarouselItem>
            <CarouselItem>
              <Box></Box>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  );
}

function Box() {
  return <div className=" h-48 w-full bg-black" />;
}
