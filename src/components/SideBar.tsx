import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import "../styles/sidebar.scss";
interface SideBarProps {
  currentSelectedGenreID: number;
  handleCurrentSelectedGenreID: (id: number) => void;
}

export function SideBar({
  currentSelectedGenreID,
  handleCurrentSelectedGenreID,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleCurrentSelectedGenreID(genre.id)}
            selected={currentSelectedGenreID === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
