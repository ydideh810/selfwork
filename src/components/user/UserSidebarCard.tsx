/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useMenu from "@/hooks/useMenu";
import { getInitials } from "../UI/UserCard";
import { useUserInfo } from "@/hooks/MemberHooks";
import { useUserStore } from "store/user";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const UserSidebarCard = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  // const userId = useUserStore((state) => state.userId);
  const { user, status } = useUserInfo("al814zcy86074hloymogrg1mv");
  const router = useRouter();
  const session = useSession();

  return (
    <>
      {status === "success" ? (
        <div
          className="sidebar__user-container"
          role="button"
          ref={btnRef}
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <div className="sidebar__user">
            {session.data?.user?.image ? (
              <img
                className="sidebar__user-provider-image"
                src={session.data?.user.image}
              />
            ) : (
              <div className={`sidebar__user-icon`}>
                {session.status === "authenticated"
                  ? getInitials(session.data?.user?.name as string)
                  : getInitials("Sample User")}
              </div>
            )}

            <span className="sidebar__user-name">
              {session.status === "authenticated"
                ? session.data?.user?.name
                : "Sample User"}
            </span>
          </div>
          <div
            className={`sidebar__user-menu ${
              isMenuOpen ? "project-card__edit-menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div className="sidebar__user-menu-section">
              {/* Opens model of user's editable data */}
              <div
                onClick={() => {
                  router.push(`/profile/${user.id}`);
                }}
                className="sidebar__user-menu-item"
              >
                <span>My Profile</span>
              </div>
              <div
                className="sidebar__user-menu-item"
                onClick={async () => {
                  console.log("LOG OUT");
                  signOut({
                    callbackUrl: "/login",
                  });
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserSidebarCard;
