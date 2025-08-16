-- CreateEnum
CREATE TYPE "public"."DataType" AS ENUM ('string', 'number', 'boolean');

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."DataType" NOT NULL,
    "valdiationRules" JSONB,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tracking_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracking_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_properties" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tracking_plan_events" (
    "id" TEXT NOT NULL,
    "trackingPlanId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "additionalProperties" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_plan_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "properties_organizationId_idx" ON "public"."properties"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_organizationId_name_type_key" ON "public"."properties"("organizationId", "name", "type");

-- CreateIndex
CREATE INDEX "events_organizationId_idx" ON "public"."events"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "events_organizationId_name_type_key" ON "public"."events"("organizationId", "name", "type");

-- CreateIndex
CREATE INDEX "tracking_plans_organizationId_idx" ON "public"."tracking_plans"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "tracking_plans_organizationId_name_key" ON "public"."tracking_plans"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "event_properties_eventId_propertyId_key" ON "public"."event_properties"("eventId", "propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "tracking_plan_events_trackingPlanId_eventId_key" ON "public"."tracking_plan_events"("trackingPlanId", "eventId");

-- AddForeignKey
ALTER TABLE "public"."event_properties" ADD CONSTRAINT "event_properties_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_properties" ADD CONSTRAINT "event_properties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking_plan_events" ADD CONSTRAINT "tracking_plan_events_trackingPlanId_fkey" FOREIGN KEY ("trackingPlanId") REFERENCES "public"."tracking_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking_plan_events" ADD CONSTRAINT "tracking_plan_events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE "public"."properties" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."tracking_plans" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."event_properties" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."tracking_plan_events" ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "properties_org_isolation" ON "public"."properties"
    FOR ALL USING ("organizationId" = current_setting('app.current_org_id', true)::text);

-- Events policies
CREATE POLICY "events_org_isolation" ON "public"."events"
    FOR ALL USING ("organizationId" = current_setting('app.current_org_id', true)::text);

-- Tracking Plans policies
CREATE POLICY "tracking_plans_org_isolation" ON "public"."tracking_plans"
    FOR ALL USING ("organizationId" = current_setting('app.current_org_id', true)::text);

-- Event Properties policies (via event relationship)
CREATE POLICY "event_properties_org_isolation" ON "public"."event_properties"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "public"."events" e 
            WHERE e.id = "event_properties"."eventId" 
            AND e."organizationId" = current_setting('app.current_org_id', true)::text
        )
    );

-- Tracking Plan Events policies (via tracking plan relationship)
CREATE POLICY "tracking_plan_events_org_isolation" ON "public"."tracking_plan_events"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "public"."tracking_plans" tp 
            WHERE tp.id = "tracking_plan_events"."trackingPlanId" 
            AND tp."organizationId" = current_setting('app.current_org_id', true)::text
        )
    );

-- Helper function to set organization context
CREATE OR REPLACE FUNCTION set_current_org_id(org_id text)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_org_id', org_id, true);
END;
$$ LANGUAGE plpgsql;