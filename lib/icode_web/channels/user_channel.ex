defmodule IcodeWeb.UserChannel do
  use Phoenix.Channel

  @impl true
  def join("user:" <> user_login, _payload, socket) do
    if socket.assigns.user_login == user_login do
      {:ok, socket}
    else
      {:error, "unauthorized"}
    end
  end
end
