import { Link, useAsyncValue,  } from "react-router";
import type { userType } from "~/types";

function ContactList({ onlineUsers, }: { onlineUsers?: string[] }) {
  const contacts = useAsyncValue() as userType[]

  return (
    <>
      {contacts.map((contact) => (
        <Link
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          to={`${contact._id}`}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers?.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
              {onlineUsers?.includes(contact._id) ?
                <p className="text-green-400 text-xs">En ligne</p>
                : ""}
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </Link>
      ))}
    </>
  );
}
export default ContactList;
