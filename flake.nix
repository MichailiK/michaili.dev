{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };
  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ] (
          system: function nixpkgs.legacyPackages.${system}
        );
    in
    {
      formatter = forAllSystems (pkgs: pkgs.nixfmt);

      devShells = forAllSystems (
        pkgs:
        let
          # keep version in sync with ./package.json & ./pnpm-workspaces.yaml
          nodejs = pkgs.nodejs_26;
          # keep version in sync with ./package.json
          pnpm = pkgs.pnpm_11.override { inherit nodejs; };
        in
        {
          default = pkgs.mkShellNoCC {
            packages = [
              nodejs
              pnpm
              pkgs.nixd
              pkgs.nixfmt
            ];
          };
        }
      );
    };
}
