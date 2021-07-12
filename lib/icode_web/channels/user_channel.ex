defmodule IcodeWeb.UserChannel do
  use Phoenix.Channel
  alias IcodeWeb.User

  @impl true
  def join("user:" <> user_login, _payload, socket) do
    if User.get_socket(socket) == user_login do
      {:ok, socket}
    else
      {:error, "unauthorized"}
    end
  end
end
