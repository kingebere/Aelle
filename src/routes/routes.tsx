import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// Utilizing the React suspense lazy loading functionality

const ResourcesPage = React.lazy(
  () => import("../pages/resourcesPage/resourcesPage")
);

const Home = React.lazy(() => import("../pages/home/home"));
const Vehicles = React.lazy(() => import("../pages/vehicles/vehicles"));
const Films = React.lazy(() => import("../pages/films/films"));
const People = React.lazy(() => import("../pages/people/people"));
const Species = React.lazy(() => import("../pages/species/species"));
const Starships = React.lazy(() => import("../pages/starships/starships"));
const Planets = React.lazy(() => import("../pages/planets/planets"));

const routes = () => (
  <React.Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/:name" element={<ResourcesPage />} />

      <Route path="/vehicles/:id" element={<Vehicles />} />
      <Route path="/people/:id" element={<People />} />
      <Route path="/films/:id" element={<Films />} />
      <Route path="/planets/:id" element={<Planets />} />
      <Route path="/species/:id" element={<Species />} />
      <Route path="/Starships/:id" element={<Starships />} />
    </Routes>
  </React.Suspense>
);
export default routes;
