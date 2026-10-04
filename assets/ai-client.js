window.FreeToolsAI = {
  async request(prompt, system) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ prompt, system }),
        signal: controller.signal
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
        throw new Error(
          data?.error || `AI request failed (${response.status}).`
        );
      }

      if (!data?.text || typeof data.text !== "string") {
        throw new Error("The AI server returned no text.");
      }

      return data.text.trim();
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("The AI request timed out. Please try again.");
      }
      throw error instanceof Error ? error : new Error("AI request failed.");
    } finally {
      clearTimeout(timeout);
    }
  }
};
