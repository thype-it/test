type Label = {
  label: string;
};

type Rateplan = {
  labels: Label[];
  name: string;
  voice: number;
  messages: number;
  data: number;
  dataRoamingFup: number;
  speed: number;
  price: number;
};
