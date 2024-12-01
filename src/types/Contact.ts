export type Contact = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  location: {
    name: string;
  },
  origin: {
    name: string;
  },
  created: string;
}
