defmodule IcodeWeb.CodeChannel do
  use Phoenix.Channel

  @impl true
  def join("code:" <> channel_id, _payload, socket) do
    if channel_id == socket.assigns.user_login do
      {:ok, socket}
    else
      {:error, "unauthorized"}
    end
  end
end
