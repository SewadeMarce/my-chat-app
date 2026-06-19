import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

function ContactList() {

  const { allContacts } = useLoaderData();
  const navigate = useNavigate()
   return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                 onClick={() => navigate(`/chat-app/${contact._id}`)}
 >
          <div className="flex items-center gap-3">
            <div className={`avatar `}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
