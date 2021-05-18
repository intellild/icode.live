defmodule IcodeWeb.PageController do
  use IcodeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
