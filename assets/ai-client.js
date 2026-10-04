window.FreeToolsAI = {
  async request(prompt, system) {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ prompt, system })
    });

    const raw = await response.text();
    let data = null;

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          `AI server returned an invalid response (${response.status}).`
        );
      }
    }

    if (!response.ok) {
      throw new Error(data?.error || `AI request failed (${response.status}).`);
    }

    if (!data?.text) {
      throw new Error("The AI server returned no text.");
    }

    return data.text;
  }
};
