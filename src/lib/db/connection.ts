import sql from "mssql";

let poolPromise: Promise<sql.ConnectionPool> | null = null;

export function isDbConfigured() {
  return Boolean(
    process.env.DB_SERVER &&
      process.env.DB_DATABASE &&
      process.env.DB_USER &&
      process.env.DB_PASSWORD,
  );
}

export function getPool(): Promise<sql.ConnectionPool> {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool({
      server: process.env.DB_SERVER ?? "",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
      database: process.env.DB_DATABASE ?? "",
      user: process.env.DB_USER ?? "",
      password: process.env.DB_PASSWORD ?? "",
      options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    })
      .connect()
      .catch((error: unknown) => {
        poolPromise = null;
        console.error("[zenta][db] failed to connect", error);
        throw error;
      });
  }

  if (!poolPromise) {
    throw new Error("Database pool was not initialized");
  }

  return poolPromise;
}

export async function closePool(): Promise<void> {
  if (poolPromise) {
    const pool = await poolPromise;
    await pool.close();
    poolPromise = null;
  }
}
