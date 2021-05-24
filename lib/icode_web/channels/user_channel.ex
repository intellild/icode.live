defmodule IcodeWeb.UserChannel do
  use Phoenix.Channel

  @impl true
  def join("user:" <> user_id, _payload, socket) do
    if Integer.to_string(socket.assigns.user_id) == user_id do
      {:ok, socket}
    else
      {:error, "unauthorized"}
    end
  end
end