import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// Utilizing the React suspense lazy loading functionality
const VehiclesPage = React.lazy(
  () => import("../pages/vehiclesPage/vehiclesPage")
);

const PeoplePage = React.lazy(() => import("../pages/peoplePage/peoplePage"));
const SpeciesPage = React.lazy(
  () => import("../pages/speciesPage/speciesPage")
);
const StarshipsPage = React.lazy(
  () => import("../pages/starshipsPage/starshipsPage")
);
const PlanetsPage = React.lazy(
  () => import("../pages/planetsPage/planetsPage")
);
const FilmsPage = React.lazy(() => import("../pages/filmsPage/filmPage"));
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

      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="/species" element={<SpeciesPage />} />
      <Route path="/Starships" element={<StarshipsPage />} />

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
