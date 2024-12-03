import dayjs from "dayjs";
import { Episode } from "../../../types/Episode"

const EpisodesInfo = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div className="-full overflow-scroll">
      <div className="sticky top-0">
        <div className="grid grid-cols-4 px-5 py-2 border-b-4 border-black bg-white font-bold">
          <div>Name</div>
          <div>Air Date</div>
          <div>Episode</div>
          <div>Created Date</div>
        </div>
      </div>
      {episodes.map((epi, i) => (
        <div className="grid grid-cols-4 px-5 py-3 border-b border-gray-500" key={`epi-${i}`}>
          <div>{epi.name}</div>
          <div>{dayjs(epi.air_date).format("YYYY-MM-DD hh:mm:ss")}</div>
          <div>{epi.episode}</div>
          <div>{dayjs(epi.created).format("YYYY-MM-DD hh:mm:ss")}</div>
        </div>
      ))}
    </div>
  )
}

export default EpisodesInfo;