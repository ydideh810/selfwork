import useMenu from "@/hooks/useMenu";
import { getInitials } from "../UI/UserCard";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useWorkspaces } from "@/hooks/WorkspaceHooks";
import Link from "next/link";
import { useUserInfo } from "@/hooks/MemberHooks";
import { useUserStore } from "store/user";

const UserSidebarCard = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { workspaces, status } = useWorkspaces(isMenuOpen);
  const userId = useUserStore((state) => state.userId);
  const { user, status: userStatus } = useUserInfo(userId);

  return (
    <>
      {userStatus === "success" ? (
        <div
          className="sidebar__user-container"
          role="button"
          ref={btnRef}
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <div className="sidebar__user">
            <div className={`sidebar__user-icon`}>
              {getInitials(user?.name!)}
            </div>
            <span className="sidebar__user-name">{user?.name}</span>
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
              <div className="sidebar__user-menu-item">
                <Link href={`/profile/${userId}`}>My Profile</Link>
              </div>
              <div
                className="sidebar__user-menu-item"
                onClick={() => console.log("LOG OUT")}
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
