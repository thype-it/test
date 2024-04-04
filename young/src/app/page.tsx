import HeroSection from "@/app/components/views/hero/HeroSection";
import RateplanSection from "@/app/components/views/rateplan/RateplanSection";
import StorySection from "@/app/components/views/story/StorySection";
import { getRateplanData } from "@/services/young-api";
import CustomerPlanSection from "./components/views/customerPlan/CustomerPlanSection";

export default async function Home() {
  const rateplans = await getRateplanData();

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <HeroSection />
      <div className="flex w-full flex-col items-center pt-12">
        <RateplanSection rateplans={rateplans} />
      </div>

      <CustomerPlanSection />

      <div className="w-full">
        <StorySection stories={5} headline="benefity">
          test
        </StorySection>
      </div>
    </main>
  );
}
