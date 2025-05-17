# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.chromium
    pkgs.envsubst
  ];
  # Sets environment variables in the workspace
  env = {
    CHROME_BIN = "${pkgs.chromium}/bin/chromium";
    SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnaHpmbGhnc2pqZnRzaWp4ZXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTg1ODMsImV4cCI6MjA2MjY5NDU4M30.VZKMMmPQNaN7FFFh9EqailT6gLIFmRzxSjpTgVJmnMI";
    SUPABASE_URL = "https://hghzflhgsjjftsijxeqy.supabase.co";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "angular.ng-template"
      "bradlc.vscode-tailwindcss"
      "esbenp.prettier-vscode"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing || npm i --no-audit --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/app/app.component.ts" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "start" "--" "--port" "$PORT" "--host" "0.0.0.0" "--disable-host-check" ];
          manager = "web";
        };
      };
    };
  };
}
