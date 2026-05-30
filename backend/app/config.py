from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        protected_namespaces=("settings_",),
    )

    project_name: str = "Pearls AQI Predictor"
    city: str = "Lahore"
    latitude: float = 31.5497
    longitude: float = 74.3436
    timezone: str = "Asia/Karachi"
    api_provider: str = "open-meteo"

    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "aqi_predictor"

    model_storage_dir: str = "./artifacts/models"
    feature_collection: str = "features_v1"
    pipeline_runs_collection: str = "pipeline_runs"
    metrics_collection: str = "model_metrics"
    registry_collection: str = "model_registry"
    predictions_collection: str = "predictions"

    github_repo: str = ""
    github_token: str = ""
    github_branch: str = "main"


settings = Settings()
