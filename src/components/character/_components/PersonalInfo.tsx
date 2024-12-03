import dayjs from "dayjs";
import { Contact } from "../../../types/Contact";

const PersonalInfo = ({ status, gender, species, location, origin, created, loading }: Contact & { loading: boolean }) => {
  const getValue = (value: string | undefined | null, isDate?: boolean) =>
    loading ? "..." : isDate ?
      dayjs(value).format('YYYY-MM-DD hh:mm:ss')
      : value || "-";
  return (
    <div className="px-5 py-2">
      <h3 className="font-semibold text-2xl pb-2">Personal Info</h3>
      <div className="border border-2 border-gray-500 p-2">
        <DetailsRow name="Status" data={getValue(status)} />
        <DetailsRow name="Gender" data={getValue(gender)} />
        <DetailsRow name="Species" data={getValue(species)} />
        <DetailsRow name="Location" data={getValue(location?.name)} />
        <DetailsRow name="Origin" data={getValue(origin?.name)} />
        <DetailsRow name="Created Date" data={getValue(created, true)} />
      </div>
    </div>
  )
}
const DetailsRow = ({ name, data }: { name: string, data: string }) => {
  return (
    <div className="flex justify-center pb-1">
      <div className="w-[25%]">
        <span className="font-semibold">{name}</span>
        <span className="float-right">:</span></div>
      <div className="w-[75%] pl-5">
        <span className="font-semibold">{data}</span>
      </div>
    </div>
  )
}

export default PersonalInfo;