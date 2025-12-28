import sql from "mssql";

import { getPool } from "../connection";

export interface LeadInsertInput {
  type: string;
  name: string;
  phone?: string;
  line?: string;
  email?: string;
  location?: string;
  sector?: string;
  surfaces?: string[];
  timeline?: string;
  budgetBand?: string;
  message?: string;
  receivedAt: string;
}

export interface LeadRow {
  id: number;
  type: string;
  name: string;
  phone: string | null;
  line: string | null;
  email: string | null;
  location: string | null;
  sector: string | null;
  surfaces: string | null;
  timeline: string | null;
  budgetBand: string | null;
  message: string | null;
  receivedAt: string;
  status: string;
  note: string | null;
  handledBy: string | null;
  handledAt: string | null;
  updatedAt: string | null;
}

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export async function insertLead(input: LeadInsertInput): Promise<number | null> {
  const pool = await getPool();

  const surfacesJson = input.surfaces ? JSON.stringify(input.surfaces) : null;

  const result = await pool
    .request()
    .input("Type", sql.NVarChar(20), input.type)
    .input("Name", sql.NVarChar(200), input.name)
    .input("Phone", sql.NVarChar(50), input.phone ?? null)
    .input("Line", sql.NVarChar(100), input.line ?? null)
    .input("Email", sql.NVarChar(200), input.email ?? null)
    .input("Location", sql.NVarChar(200), input.location ?? null)
    .input("Sector", sql.NVarChar(50), input.sector ?? null)
    .input("Surfaces", sql.NVarChar(sql.MAX), surfacesJson)
    .input("Timeline", sql.NVarChar(50), input.timeline ?? null)
    .input("BudgetBand", sql.NVarChar(50), input.budgetBand ?? null)
    .input("Message", sql.NVarChar(sql.MAX), input.message ?? null)
    .input("ReceivedAt", sql.DateTime2, new Date(input.receivedAt))
    .query(
      `
        INSERT INTO Lead (
          Type,
          Name,
          Phone,
          Line,
          Email,
          Location,
          Sector,
          Surfaces,
          Timeline,
          BudgetBand,
          Message,
          ReceivedAt
        )
        OUTPUT INSERTED.Id
        VALUES (
          @Type,
          @Name,
          @Phone,
          @Line,
          @Email,
          @Location,
          @Sector,
          @Surfaces,
          @Timeline,
          @BudgetBand,
          @Message,
          @ReceivedAt
        );
      `,
    );

  const row = result.recordset[0] as { Id?: number } | undefined;
  return typeof row?.Id === "number" ? row.Id : null;
}

export async function getLatestLeads(limit = 100): Promise<LeadRow[]> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Limit", sql.Int, limit)
    .query(
      `
        SELECT TOP (@Limit)
          Id,
          [Type],
          [Name],
          Phone,
          [Line],
          Email,
          [Location],
          Sector,
          Surfaces,
          Timeline,
          BudgetBand,
          [Message],
          ReceivedAt,
          Status,
          Note,
          HandledBy,
          HandledAt,
          UpdatedAt
        FROM Lead
        ORDER BY ReceivedAt DESC, Id DESC;
      `,
    );

  return result.recordset.map((row) => ({
    id: Number(row.Id),
    type: (row.Type ?? "") as string,
    name: (row.Name ?? "") as string,
    phone: (row.Phone ?? null) as string | null,
    line: (row.Line ?? null) as string | null,
    email: (row.Email ?? null) as string | null,
    location: (row.Location ?? null) as string | null,
    sector: (row.Sector ?? null) as string | null,
    surfaces: (row.Surfaces ?? null) as string | null,
    timeline: (row.Timeline ?? null) as string | null,
    budgetBand: (row.BudgetBand ?? null) as string | null,
    message: (row.Message ?? null) as string | null,
    receivedAt: row.ReceivedAt instanceof Date
      ? row.ReceivedAt.toISOString()
      : new Date(row.ReceivedAt as string).toISOString(),
    status: (row.Status ?? "new") as string,
    note: (row.Note ?? null) as string | null,
    handledBy: (row.HandledBy ?? null) as string | null,
    handledAt: row.HandledAt
      ? row.HandledAt instanceof Date
        ? row.HandledAt.toISOString()
        : new Date(row.HandledAt as string).toISOString()
      : null,
    updatedAt: row.UpdatedAt
      ? row.UpdatedAt instanceof Date
        ? row.UpdatedAt.toISOString()
        : new Date(row.UpdatedAt as string).toISOString()
      : null,
  }));
}

export async function updateLeadManagement(input: {
  id: number;
  status: LeadStatus;
  note: string | null;
  noteIsSet: boolean;
  handledBy: string;
}): Promise<boolean> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", sql.Int, input.id)
    .input("Status", sql.NVarChar(20), input.status)
    .input("Note", sql.NVarChar(sql.MAX), input.note)
    .input("NoteIsSet", sql.Bit, input.noteIsSet ? 1 : 0)
    .input("HandledBy", sql.NVarChar(100), input.handledBy)
    .query(
      `
        UPDATE Lead
        SET
          Status = @Status,
          Note = CASE WHEN @NoteIsSet = 1 THEN @Note ELSE Note END,
          HandledBy = @HandledBy,
          HandledAt = CASE
            WHEN @Status <> N'new' AND HandledAt IS NULL THEN SYSUTCDATETIME()
            ELSE HandledAt
          END,
          UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS Affected;
      `,
    );

  const row = result.recordset[0] as { Affected?: number } | undefined;
  return Boolean(row?.Affected);
}
