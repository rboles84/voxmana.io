export {
  ARCHIDEKT_SEARCH_BASE,
  DEFAULT_COMMANDER_DECK_FORMAT,
  SERVICE_CHIP_META,
  COMMANDER_FACTION_GUIDANCE,
  getCommanderFactionGuidance,
  buildBasicLandCards,
  buildCommanderLandRecommendations,
  hasRenderableLandTier,
  validateDeckTagData,
  createArchidektTagCatalog,
  resolveArchidektTagName,
  getColorIdentity,
  getExternalDeckRoutingAlias,
  buildMtgDecksCommanderUrl,
  buildArchidektDeckSearchUrl,
  buildMtgDecksUrl,
  getServiceChipMeta,
  buildCommanderDirectoryLinks,
  collectCommanderPreviewCandidates,
  collectArchidektTagLanes,
  buildArchidektSearchLinks,
  buildCommanderPackageLinks,
} from "./dossier/foundation.js?v=vm687";

export {
  buildReadingOmens,
  buildCommanderStartingLane,
  explainAdjacentFit,
  buildCommanderStarterCards,
  buildWhatToLookFor,
  resolveSignalBand,
  resolveSummaryAdjacentFit,
  buildWhereThisLeadsSummary,
  buildPlayPatternSummary,
  buildResultSummaryStrip,
  buildCommanderDossier,
} from "./dossier/reading.js?v=vm687";

export {
  PRECON_PREVIEW_LIMIT,
  selectPreconPreviewRecommendations,
  buildCommanderDeckStartFallbackCandidates,
  buildPublicPreconRationale,
  buildPreconRecommendations,
} from "./dossier/precons.js?v=vm687";

export {
  renderCommanderDossierText,
  auditCommanderDossier,
} from "./dossier/audit.js?v=vm687";
