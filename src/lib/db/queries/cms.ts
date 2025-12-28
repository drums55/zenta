import sql from "mssql";

import { getPool } from "../connection";

export type CmsContentType = "article" | "case_study" | "product";
export type CmsContentStatus = "draft" | "scheduled" | "published" | "archived";
export type CmsAssetRole = "cover" | "gallery" | "inline" | "attachment";

export interface CmsContentRow {
  id: number;
  contentKey: string;
  type: CmsContentType;
  slug: string;
  title: string;
  summary: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  bodyJson: string | null;
  bodyHtml: string | null;
  status: CmsContentStatus;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CmsAssetRow {
  id: number;
  bucket: string;
  storagePath: string;
  publicUrl: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  uploadedBy: string | null;
  createdAt: string;
}

function toIso(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return new Date(value as string).toISOString();
}

function isCmsType(value: string): value is CmsContentType {
  return value === "article" || value === "case_study" || value === "product";
}

function isCmsStatus(value: string): value is CmsContentStatus {
  return value === "draft" || value === "scheduled" || value === "published" || value === "archived";
}

export async function createCmsContentDraft(input: {
  type: CmsContentType;
  slug: string;
  title: string;
  createdBy: string;
}): Promise<{ id: number; contentKey: string } | null> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Type", sql.NVarChar(20), input.type)
    .input("Slug", sql.NVarChar(200), input.slug)
    .input("Title", sql.NVarChar(300), input.title)
    .input("Status", sql.NVarChar(20), "draft")
    .input("CreatedBy", sql.NVarChar(100), input.createdBy)
    .input("UpdatedBy", sql.NVarChar(100), input.createdBy)
    .query(
      `
        DECLARE @ContentKey UNIQUEIDENTIFIER = NEWID();

        INSERT INTO dbo.CmsContent (
          ContentKey,
          [Type],
          Slug,
          Title,
          [Status],
          CreatedBy,
          UpdatedBy,
          CreatedAt,
          UpdatedAt
        )
        OUTPUT INSERTED.Id, INSERTED.ContentKey
        VALUES (
          @ContentKey,
          @Type,
          @Slug,
          @Title,
          @Status,
          @CreatedBy,
          @UpdatedBy,
          SYSUTCDATETIME(),
          SYSUTCDATETIME()
        );
      `,
    );

  const row = result.recordset[0] as { Id?: number; ContentKey?: string } | undefined;
  if (!row?.Id || !row.ContentKey) {
    return null;
  }

  return {
    id: Number(row.Id),
    contentKey: String(row.ContentKey),
  };
}

export async function getCmsContentById(id: number): Promise<CmsContentRow | null> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", sql.Int, id)
    .query(
      `
        SELECT TOP 1
          Id,
          ContentKey,
          [Type],
          Slug,
          Title,
          Summary,
          CoverImageUrl,
          CoverImageAlt,
          SeoTitle,
          SeoDescription,
          OgImageUrl,
          BodyJson,
          BodyHtml,
          [Status],
          PublishedAt,
          ScheduledAt,
          CreatedBy,
          UpdatedBy,
          CreatedAt,
          UpdatedAt
        FROM dbo.CmsContent
        WHERE Id = @Id;
      `,
    );

  const row = result.recordset[0] as Record<string, unknown> | undefined;
  if (!row) {
    return null;
  }

  const typeRaw = String(row.Type ?? "");
  const statusRaw = String(row.Status ?? "");
  if (!isCmsType(typeRaw) || !isCmsStatus(statusRaw)) {
    return null;
  }

  return {
    id: Number(row.Id),
    contentKey: String(row.ContentKey),
    type: typeRaw,
    slug: String(row.Slug ?? ""),
    title: String(row.Title ?? ""),
    summary: (row.Summary ?? null) as string | null,
    coverImageUrl: (row.CoverImageUrl ?? null) as string | null,
    coverImageAlt: (row.CoverImageAlt ?? null) as string | null,
    seoTitle: (row.SeoTitle ?? null) as string | null,
    seoDescription: (row.SeoDescription ?? null) as string | null,
    ogImageUrl: (row.OgImageUrl ?? null) as string | null,
    bodyJson: (row.BodyJson ?? null) as string | null,
    bodyHtml: (row.BodyHtml ?? null) as string | null,
    status: statusRaw,
    publishedAt: row.PublishedAt ? toIso(row.PublishedAt) : null,
    scheduledAt: row.ScheduledAt ? toIso(row.ScheduledAt) : null,
    createdBy: (row.CreatedBy ?? null) as string | null,
    updatedBy: (row.UpdatedBy ?? null) as string | null,
    createdAt: toIso(row.CreatedAt),
    updatedAt: toIso(row.UpdatedAt),
  };
}

export async function listCmsContent(options: {
  type?: CmsContentType;
  status?: CmsContentStatus;
  limit?: number;
}): Promise<CmsContentRow[]> {
  const pool = await getPool();

  const limit = options.limit ?? 100;

  const where: string[] = [];
  if (options.type) {
    where.push("[Type] = @Type");
  }
  if (options.status) {
    where.push("[Status] = @Status");
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const request = pool.request().input("Limit", sql.Int, limit);
  if (options.type) {
    request.input("Type", sql.NVarChar(20), options.type);
  }
  if (options.status) {
    request.input("Status", sql.NVarChar(20), options.status);
  }

  const result = await request.query(
    `
      SELECT TOP (@Limit)
        Id,
        ContentKey,
        [Type],
        Slug,
        Title,
        Summary,
        CoverImageUrl,
        CoverImageAlt,
        SeoTitle,
        SeoDescription,
        OgImageUrl,
        BodyJson,
        BodyHtml,
        [Status],
        PublishedAt,
        ScheduledAt,
        CreatedBy,
        UpdatedBy,
        CreatedAt,
        UpdatedAt
      FROM dbo.CmsContent
      ${whereSql}
      ORDER BY UpdatedAt DESC, Id DESC;
    `,
  );

  return result.recordset
    .map((row) => {
      const typeRaw = String(row.Type ?? "");
      const statusRaw = String(row.Status ?? "");
      if (!isCmsType(typeRaw) || !isCmsStatus(statusRaw)) {
        return null;
      }

      return {
        id: Number(row.Id),
        contentKey: String(row.ContentKey),
        type: typeRaw,
        slug: String(row.Slug ?? ""),
        title: String(row.Title ?? ""),
        summary: (row.Summary ?? null) as string | null,
        coverImageUrl: (row.CoverImageUrl ?? null) as string | null,
        coverImageAlt: (row.CoverImageAlt ?? null) as string | null,
        seoTitle: (row.SeoTitle ?? null) as string | null,
        seoDescription: (row.SeoDescription ?? null) as string | null,
        ogImageUrl: (row.OgImageUrl ?? null) as string | null,
        bodyJson: (row.BodyJson ?? null) as string | null,
        bodyHtml: (row.BodyHtml ?? null) as string | null,
        status: statusRaw,
        publishedAt: row.PublishedAt ? toIso(row.PublishedAt) : null,
        scheduledAt: row.ScheduledAt ? toIso(row.ScheduledAt) : null,
        createdBy: (row.CreatedBy ?? null) as string | null,
        updatedBy: (row.UpdatedBy ?? null) as string | null,
        createdAt: toIso(row.CreatedAt),
        updatedAt: toIso(row.UpdatedAt),
      } satisfies CmsContentRow;
    })
    .filter((x): x is CmsContentRow => Boolean(x));
}

export async function listPublishedCmsContentByType(options: {
  type: CmsContentType;
  limit?: number;
}): Promise<CmsContentRow[]> {
  const pool = await getPool();

  const limit = options.limit ?? 200;

  const result = await pool
    .request()
    .input("Limit", sql.Int, limit)
    .input("Type", sql.NVarChar(20), options.type)
    .input("Status", sql.NVarChar(20), "published")
    .query(
      `
        SELECT TOP (@Limit)
          Id,
          ContentKey,
          [Type],
          Slug,
          Title,
          Summary,
          CoverImageUrl,
          CoverImageAlt,
          SeoTitle,
          SeoDescription,
          OgImageUrl,
          BodyJson,
          BodyHtml,
          [Status],
          PublishedAt,
          ScheduledAt,
          CreatedBy,
          UpdatedBy,
          CreatedAt,
          UpdatedAt
        FROM dbo.CmsContent
        WHERE
          [Type] = @Type
          AND [Status] = @Status
          AND (PublishedAt IS NULL OR PublishedAt <= SYSUTCDATETIME())
        ORDER BY
          COALESCE(PublishedAt, UpdatedAt) DESC,
          Id DESC;
      `,
    );

  return result.recordset
    .map((row) => {
      const typeRaw = String(row.Type ?? "");
      const statusRaw = String(row.Status ?? "");
      if (!isCmsType(typeRaw) || !isCmsStatus(statusRaw)) {
        return null;
      }

      return {
        id: Number(row.Id),
        contentKey: String(row.ContentKey),
        type: typeRaw,
        slug: String(row.Slug ?? ""),
        title: String(row.Title ?? ""),
        summary: (row.Summary ?? null) as string | null,
        coverImageUrl: (row.CoverImageUrl ?? null) as string | null,
        coverImageAlt: (row.CoverImageAlt ?? null) as string | null,
        seoTitle: (row.SeoTitle ?? null) as string | null,
        seoDescription: (row.SeoDescription ?? null) as string | null,
        ogImageUrl: (row.OgImageUrl ?? null) as string | null,
        bodyJson: (row.BodyJson ?? null) as string | null,
        bodyHtml: (row.BodyHtml ?? null) as string | null,
        status: statusRaw,
        publishedAt: row.PublishedAt ? toIso(row.PublishedAt) : null,
        scheduledAt: row.ScheduledAt ? toIso(row.ScheduledAt) : null,
        createdBy: (row.CreatedBy ?? null) as string | null,
        updatedBy: (row.UpdatedBy ?? null) as string | null,
        createdAt: toIso(row.CreatedAt),
        updatedAt: toIso(row.UpdatedAt),
      } satisfies CmsContentRow;
    })
    .filter((x): x is CmsContentRow => Boolean(x));
}

export async function getPublishedCmsContentByTypeAndSlug(input: {
  type: CmsContentType;
  slug: string;
}): Promise<CmsContentRow | null> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Type", sql.NVarChar(20), input.type)
    .input("Slug", sql.NVarChar(200), input.slug)
    .input("Status", sql.NVarChar(20), "published")
    .query(
      `
        SELECT TOP 1
          Id,
          ContentKey,
          [Type],
          Slug,
          Title,
          Summary,
          CoverImageUrl,
          CoverImageAlt,
          SeoTitle,
          SeoDescription,
          OgImageUrl,
          BodyJson,
          BodyHtml,
          [Status],
          PublishedAt,
          ScheduledAt,
          CreatedBy,
          UpdatedBy,
          CreatedAt,
          UpdatedAt
        FROM dbo.CmsContent
        WHERE
          [Type] = @Type
          AND Slug = @Slug
          AND [Status] = @Status
          AND (PublishedAt IS NULL OR PublishedAt <= SYSUTCDATETIME())
        ORDER BY Id DESC;
      `,
    );

  const row = result.recordset[0] as Record<string, unknown> | undefined;
  if (!row) {
    return null;
  }

  const typeRaw = String(row.Type ?? "");
  const statusRaw = String(row.Status ?? "");
  if (!isCmsType(typeRaw) || !isCmsStatus(statusRaw)) {
    return null;
  }

  return {
    id: Number(row.Id),
    contentKey: String(row.ContentKey),
    type: typeRaw,
    slug: String(row.Slug ?? ""),
    title: String(row.Title ?? ""),
    summary: (row.Summary ?? null) as string | null,
    coverImageUrl: (row.CoverImageUrl ?? null) as string | null,
    coverImageAlt: (row.CoverImageAlt ?? null) as string | null,
    seoTitle: (row.SeoTitle ?? null) as string | null,
    seoDescription: (row.SeoDescription ?? null) as string | null,
    ogImageUrl: (row.OgImageUrl ?? null) as string | null,
    bodyJson: (row.BodyJson ?? null) as string | null,
    bodyHtml: (row.BodyHtml ?? null) as string | null,
    status: statusRaw,
    publishedAt: row.PublishedAt ? toIso(row.PublishedAt) : null,
    scheduledAt: row.ScheduledAt ? toIso(row.ScheduledAt) : null,
    createdBy: (row.CreatedBy ?? null) as string | null,
    updatedBy: (row.UpdatedBy ?? null) as string | null,
    createdAt: toIso(row.CreatedAt),
    updatedAt: toIso(row.UpdatedAt),
  };
}

export async function updateCmsContent(input: {
  id: number;
  type: CmsContentType;
  slug: string;
  title: string;
  summary: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  bodyJson: string | null;
  bodyHtml: string | null;
  updatedBy: string;
}): Promise<boolean> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", sql.Int, input.id)
    .input("Type", sql.NVarChar(20), input.type)
    .input("Slug", sql.NVarChar(200), input.slug)
    .input("Title", sql.NVarChar(300), input.title)
    .input("Summary", sql.NVarChar(1000), input.summary)
    .input("CoverImageUrl", sql.NVarChar(1000), input.coverImageUrl)
    .input("CoverImageAlt", sql.NVarChar(300), input.coverImageAlt)
    .input("SeoTitle", sql.NVarChar(300), input.seoTitle)
    .input("SeoDescription", sql.NVarChar(1000), input.seoDescription)
    .input("OgImageUrl", sql.NVarChar(1000), input.ogImageUrl)
    .input("BodyJson", sql.NVarChar(sql.MAX), input.bodyJson)
    .input("BodyHtml", sql.NVarChar(sql.MAX), input.bodyHtml)
    .input("UpdatedBy", sql.NVarChar(100), input.updatedBy)
    .query(
      `
        UPDATE dbo.CmsContent
        SET
          [Type] = @Type,
          Slug = @Slug,
          Title = @Title,
          Summary = @Summary,
          CoverImageUrl = @CoverImageUrl,
          CoverImageAlt = @CoverImageAlt,
          SeoTitle = @SeoTitle,
          SeoDescription = @SeoDescription,
          OgImageUrl = @OgImageUrl,
          BodyJson = @BodyJson,
          BodyHtml = @BodyHtml,
          UpdatedBy = @UpdatedBy,
          UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS Affected;
      `,
    );

  const row = result.recordset[0] as { Affected?: number } | undefined;
  return Boolean(row?.Affected);
}

export async function publishCmsContent(input: {
  id: number;
  updatedBy: string;
  publishedAt?: Date;
}): Promise<boolean> {
  const pool = await getPool();

  const publishedAt = input.publishedAt ?? new Date();

  const result = await pool
    .request()
    .input("Id", sql.Int, input.id)
    .input("Status", sql.NVarChar(20), "published")
    .input("PublishedAt", sql.DateTime2, publishedAt)
    .input("UpdatedBy", sql.NVarChar(100), input.updatedBy)
    .query(
      `
        UPDATE dbo.CmsContent
        SET
          [Status] = @Status,
          PublishedAt = @PublishedAt,
          ScheduledAt = NULL,
          UpdatedBy = @UpdatedBy,
          UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS Affected;
      `,
    );

  const row = result.recordset[0] as { Affected?: number } | undefined;
  return Boolean(row?.Affected);
}

export async function scheduleCmsContent(input: {
  id: number;
  updatedBy: string;
  scheduledAt: Date;
}): Promise<boolean> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", sql.Int, input.id)
    .input("Status", sql.NVarChar(20), "scheduled")
    .input("ScheduledAt", sql.DateTime2, input.scheduledAt)
    .input("UpdatedBy", sql.NVarChar(100), input.updatedBy)
    .query(
      `
        UPDATE dbo.CmsContent
        SET
          [Status] = @Status,
          ScheduledAt = @ScheduledAt,
          UpdatedBy = @UpdatedBy,
          UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS Affected;
      `,
    );

  const row = result.recordset[0] as { Affected?: number } | undefined;
  return Boolean(row?.Affected);
}

export async function setCmsContentStatus(input: {
  id: number;
  status: CmsContentStatus;
  updatedBy: string;
}): Promise<boolean> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Id", sql.Int, input.id)
    .input("Status", sql.NVarChar(20), input.status)
    .input("UpdatedBy", sql.NVarChar(100), input.updatedBy)
    .query(
      `
        UPDATE dbo.CmsContent
        SET
          [Status] = @Status,
          ${input.status === "published" ? "PublishedAt = COALESCE(PublishedAt, SYSUTCDATETIME())," : ""}
          ${input.status === "draft" || input.status === "archived" ? "ScheduledAt = NULL," : ""}
          UpdatedBy = @UpdatedBy,
          UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @Id;

        SELECT @@ROWCOUNT AS Affected;
      `,
    );

  const row = result.recordset[0] as { Affected?: number } | undefined;
  return Boolean(row?.Affected);
}

export async function upsertCmsAsset(input: {
  bucket: string;
  storagePath: string;
  publicUrl: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  width?: number | null;
  height?: number | null;
  altText?: string | null;
  uploadedBy?: string | null;
}): Promise<number | null> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("Bucket", sql.NVarChar(200), input.bucket)
    .input("StoragePath", sql.NVarChar(512), input.storagePath)
    .input("PublicUrl", sql.NVarChar(1000), input.publicUrl)
    .input("FileName", sql.NVarChar(300), input.fileName)
    .input("ContentType", sql.NVarChar(200), input.contentType)
    .input("SizeBytes", sql.BigInt, input.sizeBytes)
    .input("Width", sql.Int, input.width ?? null)
    .input("Height", sql.Int, input.height ?? null)
    .input("AltText", sql.NVarChar(300), input.altText ?? null)
    .input("UploadedBy", sql.NVarChar(100), input.uploadedBy ?? null)
    .query(
      `
        MERGE dbo.CmsAsset AS target
        USING (SELECT @Bucket AS Bucket, @StoragePath AS StoragePath) AS source
          ON target.Bucket = source.Bucket AND target.StoragePath = source.StoragePath
        WHEN MATCHED THEN
          UPDATE SET
            PublicUrl = @PublicUrl,
            FileName = @FileName,
            ContentType = @ContentType,
            SizeBytes = @SizeBytes,
            Width = @Width,
            Height = @Height,
            AltText = @AltText,
            UploadedBy = COALESCE(@UploadedBy, target.UploadedBy)
        WHEN NOT MATCHED THEN
          INSERT (Bucket, StoragePath, PublicUrl, FileName, ContentType, SizeBytes, Width, Height, AltText, UploadedBy, CreatedAt)
          VALUES (@Bucket, @StoragePath, @PublicUrl, @FileName, @ContentType, @SizeBytes, @Width, @Height, @AltText, @UploadedBy, SYSUTCDATETIME())
        OUTPUT INSERTED.Id;
      `,
    );

  const row = result.recordset[0] as { Id?: number } | undefined;
  return typeof row?.Id === "number" ? row.Id : null;
}

export async function attachAssetToContent(input: {
  contentId: number;
  assetId: number;
  role: CmsAssetRole;
  sortOrder?: number;
}): Promise<boolean> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("ContentId", sql.Int, input.contentId)
    .input("AssetId", sql.Int, input.assetId)
    .input("Role", sql.NVarChar(30), input.role)
    .input("SortOrder", sql.Int, input.sortOrder ?? 0)
    .query(
      `
        IF NOT EXISTS (
          SELECT 1
          FROM dbo.CmsContentAsset
          WHERE ContentId = @ContentId AND AssetId = @AssetId AND [Role] = @Role
        )
        BEGIN
          INSERT INTO dbo.CmsContentAsset (ContentId, AssetId, [Role], SortOrder, CreatedAt)
          VALUES (@ContentId, @AssetId, @Role, @SortOrder, SYSUTCDATETIME());
        END

        SELECT 1 AS Ok;
      `,
    );

  const row = result.recordset[0] as { Ok?: number } | undefined;
  return Boolean(row?.Ok);
}

export async function listAssetsForContent(contentId: number): Promise<Array<CmsAssetRow & { role: CmsAssetRole; sortOrder: number }>> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("ContentId", sql.Int, contentId)
    .query(
      `
        SELECT
          a.Id,
          a.Bucket,
          a.StoragePath,
          a.PublicUrl,
          a.FileName,
          a.ContentType,
          a.SizeBytes,
          a.Width,
          a.Height,
          a.AltText,
          a.UploadedBy,
          a.CreatedAt,
          ca.[Role],
          ca.SortOrder
        FROM dbo.CmsContentAsset ca
        INNER JOIN dbo.CmsAsset a
          ON a.Id = ca.AssetId
        WHERE ca.ContentId = @ContentId
        ORDER BY ca.[Role] ASC, ca.SortOrder ASC, ca.Id ASC;
      `,
    );

  return result.recordset.map((row) => ({
    id: Number(row.Id),
    bucket: String(row.Bucket ?? ""),
    storagePath: String(row.StoragePath ?? ""),
    publicUrl: String(row.PublicUrl ?? ""),
    fileName: String(row.FileName ?? ""),
    contentType: String(row.ContentType ?? ""),
    sizeBytes: Number(row.SizeBytes ?? 0),
    width: row.Width === null || row.Width === undefined ? null : Number(row.Width),
    height: row.Height === null || row.Height === undefined ? null : Number(row.Height),
    altText: (row.AltText ?? null) as string | null,
    uploadedBy: (row.UploadedBy ?? null) as string | null,
    createdAt: toIso(row.CreatedAt),
    role: String(row.Role ?? "inline") as CmsAssetRole,
    sortOrder: Number(row.SortOrder ?? 0),
  }));
}
