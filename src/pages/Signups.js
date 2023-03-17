import { useParams } from "react-router";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import SearchQuery from "../functions/SearchQuery";
import useFetch from "../hooks/useFetch";

const Signups = () => {
  const { id } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useFetch("http://localhost:4000/api/v1/activities/" + id);

  error && toast.error("Kunne ikke hente data, prøv igen senere");

  let users = SearchQuery("default", activity?.users);

  return (
    <>
      <section className="p-[28px] pt-[32px]">
        <Heading optionalCss="truncate">{activity.name}</Heading>
        {/*         <div className="mt-4">
          <p className="text-secondaryText text-medium my-2">
            Instruktør{instructors?.length > 1 && "er"}:{" "}
          </p>
          {instructors[0] &&
            instructors?.map((instructor) => {
              return (
                <p className="text-secondaryText text-small">
                  {instructor.firstname} {instructor.lastname}
                </p>
              );
            })}
        </div> */}
        <div className="mt-4">
          <p className="text-secondaryText text-medium my-2">Tilmeldte:</p>
          {users[0] ? (
            users?.map((user) => {
              return (
                <p className="text-secondaryText text-small">
                  {user.firstname} {user.lastname}
                </p>
              );
            })
          ) : (
            <p className="text-secondaryText text-small">
              Ingen brugerer er tilmeldt denne klasse
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Signups;
