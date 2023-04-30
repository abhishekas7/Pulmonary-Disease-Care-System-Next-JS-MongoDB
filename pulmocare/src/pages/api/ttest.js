async function handler() {
export default async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/kormilitzin/en_core_med7_lg",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
}

