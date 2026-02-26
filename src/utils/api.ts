// 由于我们配置了 Vite Proxy，因此无论如何都使用相对路径 /api 即可
// 在开发环境下，请求将打到本地开发服务器，会被代理到 http://127.0.0.1:8788
// 在生产环境下，由于同源部署，请求将正常打向 /api
const API_BASE = "/api";

/**
 * 统一的 API 请求封装
 */
export const apiFetch = async <T = any>(endpoint: string, options?: RequestInit): Promise<T> => {
    // 确保 endpoint 以 / 开头
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE}${normalizedEndpoint.replace(/^\/api/, '')}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`请求失败: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[apiFetch] Error fetching ${url}:`, error);
        throw error;
    }
};
