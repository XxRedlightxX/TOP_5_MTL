export async function apiRequest(url, options = {}) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}
