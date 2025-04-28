import ProfilePage from "./components/Profile";

export default function Users() {
  return (
    <main className="flex flex-col">
      <div className="p-4 mr-[16px]">
        <h1 className="text-[34px] font-bold mb-4">Profile</h1>
        <ProfilePage />
      </div>
    </main>
  );
}
