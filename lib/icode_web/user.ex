defmodule IcodeWeb.User do
  alias Phoenix.Socket

  @spec set_socket(Socket.t(), String.t()) :: Socket.t()
  def set_socket(socket, user_login) do
    Socket.assign(socket, :user_login, user_login)
  end

  @spec get_socket(Socket.t()) :: String.t()
  def get_socket(socket) do
    socket.assigns.user_login
  end
end
