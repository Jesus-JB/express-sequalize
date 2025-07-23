export default function Profile() {
  const email = localStorage.getItem("userEmail");
  const initial = email ? email[0].toUpperCase() : "U";

  return (
    <div className="max-w-md mx-auto pt-24 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Avatar con inicial */}
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mb-4 shadow-md">
          {initial}
        </div>
        <h2 className="text-2xl font-bold mb-2">Perfil de Usuario</h2>
        <div className="w-full bg-gray-50 rounded p-4 flex flex-col items-center">
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {email}
          </div>
        </div>
      </div>
    </div>
  );
}
